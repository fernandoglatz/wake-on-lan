package scheduler

import (
	"context"
	"fernandoglatz/wake-on-lan/internal/core/service"
	"fernandoglatz/wake-on-lan/internal/infrastructure/repository"

	"github.com/robfig/cron/v3"
)

func StartCronWorker(ctx context.Context) error {
	cronWorker := cron.New()

	deviceRepository := repository.NewDeviceRepository()
	deviceService := service.NewDeviceService(deviceRepository)

	_, err := cronWorker.AddFunc("* * * * *", deviceService.UpdateDevicesStatus)
	if err != nil {
		return err
	}

	cronWorker.Start()

	return nil
}
