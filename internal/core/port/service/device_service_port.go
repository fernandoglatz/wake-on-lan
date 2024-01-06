package service

import (
	"context"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/exceptions"
	"fernandoglatz/wake-on-lan/internal/core/entity"
)

type IDeviceService interface {
	Get(ctx context.Context, id string) (entity.Device, *exceptions.WrappedError)
	GetAll(ctx context.Context) ([]entity.Device, *exceptions.WrappedError)
	Save(ctx context.Context, device *entity.Device) *exceptions.WrappedError
	Remove(ctx context.Context, device entity.Device) *exceptions.WrappedError
}
