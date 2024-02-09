package service

import (
	"context"
	"fernandoglatz/wake-on-lan/internal/core/common/utils"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/constants"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/exceptions"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/log"
	"fernandoglatz/wake-on-lan/internal/core/entity"
	devicestatus "fernandoglatz/wake-on-lan/internal/core/entity/device"
	"fernandoglatz/wake-on-lan/internal/core/port/repository"
	"strings"

	"github.com/da-rod/wakeonlan"
	"github.com/kotakanbe/go-pingscanner"
)

type DeviceService struct {
	repository repository.IDeviceRepository
}

func NewDeviceService(repository repository.IDeviceRepository) *DeviceService {
	return &DeviceService{
		repository: repository,
	}
}

func (service *DeviceService) Get(ctx context.Context, id string) (entity.Device, *exceptions.WrappedError) {
	return service.repository.Get(ctx, id)
}

func (service *DeviceService) GetAll(ctx context.Context) ([]entity.Device, *exceptions.WrappedError) {
	return service.repository.GetAll(ctx)
}

func (service *DeviceService) Save(ctx context.Context, device *entity.Device) *exceptions.WrappedError {
	device.Mac = strings.ToUpper(device.Mac)

	if utils.IsEmptyStr(string(device.Status)) {
		device.Status = devicestatus.OFFLINE
	}

	return service.repository.Save(ctx, device)
}

func (service *DeviceService) Remove(ctx context.Context, device entity.Device) *exceptions.WrappedError {
	return service.repository.Remove(ctx, device)
}

func (service *DeviceService) WakeOn(ctx context.Context, device entity.Device) *exceptions.WrappedError {
	mac := device.Mac

	mp, err := wakeonlan.NewMagicPacket(mac)
	if err != nil {
		return &exceptions.WrappedError{
			BaseError: exceptions.WakeOnLanError,
			Error:     err,
		}
	}

	err = mp.Send()
	if err != nil {
		return &exceptions.WrappedError{
			BaseError: exceptions.WakeOnLanError,
			Error:     err,
		}
	}

	return nil
}

func (service *DeviceService) UpdateDevicesStatus() {
	ctx := context.Background()
	devices, err := service.GetAll(ctx)

	if err != nil {
		log.Error(ctx).Msg("Error on getting devices: " + err.GetMessage())
		return
	}

	for _, device := range devices {
		isOnline := service.isOnline(ctx, device)

		if isOnline && devicestatus.OFFLINE == device.Status {
			device.Status = devicestatus.ONLINE
			service.Save(ctx, &device)

		} else if !isOnline && devicestatus.ONLINE == device.Status {
			device.Status = devicestatus.OFFLINE
			service.Save(ctx, &device)
		}
	}
}

func (service *DeviceService) isOnline(ctx context.Context, device entity.Device) bool {
	scanner := pingscanner.PingScanner{
		CIDR: device.Ip + "/32",
		PingOptions: []string{
			"-c1",
			"-t1",
		},
		NumOfConcurrency: 1,
	}
	if aliveIPs, err := scanner.Scan(); err != nil {
		log.Error(ctx).Msg("Error on pinging device: " + err.Error())

	} else {
		if len(aliveIPs) > constants.ZERO {
			return true
		}
	}

	return false
}
