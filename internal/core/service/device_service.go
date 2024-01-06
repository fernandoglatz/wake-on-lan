package service

import (
	"context"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/exceptions"
	"fernandoglatz/wake-on-lan/internal/core/entity"
	"fernandoglatz/wake-on-lan/internal/core/port/repository"
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
	return service.repository.Save(ctx, device)
}

func (service *DeviceService) Remove(ctx context.Context, device entity.Device) *exceptions.WrappedError {
	return service.repository.Remove(ctx, device)
}
