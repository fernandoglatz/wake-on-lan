package service

import (
	"context"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/exceptions"
	"fernandoglatz/wake-on-lan/internal/core/entity"
	"fernandoglatz/wake-on-lan/internal/core/port/repository"
	"strings"

	"github.com/da-rod/wakeonlan"
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
