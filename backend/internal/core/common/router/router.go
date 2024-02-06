package router

import (
	"context"
	_ "fernandoglatz/wake-on-lan/docs"
	"fernandoglatz/wake-on-lan/internal/controller"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/log"
	"fernandoglatz/wake-on-lan/internal/core/service"
	"fernandoglatz/wake-on-lan/internal/infrastructure/config"
	"fernandoglatz/wake-on-lan/internal/infrastructure/repository"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Setup(ctx context.Context, engine *gin.Engine) {
	log.Info(ctx).Msg("Configuring routes")

	contextPath := config.ApplicationConfig.Server.ContextPath
	router := engine.Group(contextPath)

	deviceRepository := repository.NewDeviceRepository()
	deviceService := service.NewDeviceService(deviceRepository)
	deviceController := controller.NewDeviceController(deviceService)

	healthController := controller.NewHealthController()

	routerDevice := router.Group("/device")
	routerDevice.GET("", deviceController.Get)
	routerDevice.GET(":id", deviceController.GetId)
	routerDevice.PUT("", deviceController.Put)
	routerDevice.PUT(":id", deviceController.PutId)
	routerDevice.POST(":id", deviceController.Post)
	routerDevice.DELETE(":id", deviceController.DeleteId)
	routerDevice.POST(":id/wake-on", deviceController.WakeOn)

	router.GET("/health", healthController.Health)
	router.GET("/swagger-ui/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Info(ctx).Msg("Routes configured")
}
