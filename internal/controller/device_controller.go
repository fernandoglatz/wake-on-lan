package controller

import (
	"encoding/json"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/constants"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/exceptions"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/log"
	"fernandoglatz/wake-on-lan/internal/core/entity"
	"fernandoglatz/wake-on-lan/internal/core/model/request"
	"fernandoglatz/wake-on-lan/internal/core/port/service"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DeviceController struct {
	service service.IDeviceService
}

func NewDeviceController(service service.IDeviceService) *DeviceController {
	return &DeviceController{
		service: service,
	}
}

// @Tags	device
// @Summary	Get devices
// @Produce	json
// @Success	200	{array}		entity.Device
// @Failure	400	{object}	response.Response
// @Failure	500	{object}	response.Response
// @Router	/device [get]
func (controller *DeviceController) Get(ginCtx *gin.Context) {
	ctx := GetContext(ginCtx)
	log.Info(ctx).Msg("Getting devices")

	devices, err := controller.service.GetAll(ctx)
	if err != nil {
		HandleError(ctx, ginCtx, err)
		return
	}

	ginCtx.JSON(http.StatusOK, devices)
}

// @Tags	device
// @Summary	Get device
// @Param	id		path	string  true "id"
// @Produce	json
// @Success	200	{object}	entity.Device
// @Failure	400	{object}	response.Response
// @Failure	500	{object}	response.Response
// @Router	/device/{id} [get]
func (controller *DeviceController) GetId(ginCtx *gin.Context) {
	ctx := GetContext(ginCtx)
	id := ginCtx.Param("id")

	log.Info(ctx).Msg(fmt.Sprintf("Getting device %s", id))

	device, err := controller.service.Get(ctx, id)
	if err != nil {
		HandleError(ctx, ginCtx, err)
		return
	}

	ginCtx.JSON(http.StatusOK, device)
}

// @Tags	device
// @Summary	Update device
// @Param	id		path	string  true "id"
// @Param	request	body	request.DeviceRequest true "body"
// @Accept	json
// @Produce	json
// @Success	200	{object}	entity.Device
// @Failure	400	{object}	response.Response
// @Failure	500	{object}	response.Response
// @Router		/device/{id} [post]
func (controller *DeviceController) Post(ginCtx *gin.Context) {
	id := ginCtx.Param(constants.ID)
	controller.save(ginCtx, &id, false)
}

// @Tags	device
// @Summary	Create device
// @Param	request	body	request.DeviceRequest true "body"
// @Accept	json
// @Produce	json
// @Success	200	{object}	entity.Device
// @Failure	400	{object}	response.Response
// @Failure	500	{object}	response.Response
// @Router		/device [put]
func (controller *DeviceController) Put(ginCtx *gin.Context) {
	controller.save(ginCtx, nil, true)
}

// @Tags	device
// @Summary	Update device
// @Param	id		path	string  true "id"
// @Param	request	body	request.DeviceRequest true "body"
// @Accept	json
// @Produce	json
// @Success	200	{object}	entity.Device
// @Failure	400	{object}	response.Response
// @Failure	500	{object}	response.Response
// @Router		/device/{id} [put]
func (controller *DeviceController) PutId(ginCtx *gin.Context) {
	id := ginCtx.Param(constants.ID)
	controller.save(ginCtx, &id, true)
}

// @Tags	device
// @Summary	Delete device
// @Param	id		path	string  true "id"
// @Produce	json
// @Success	204
// @Failure	400	{object}	response.Response
// @Failure	500	{object}	response.Response
// @Router	/device/{id} [delete]
func (controller *DeviceController) DeleteId(ginCtx *gin.Context) {
	ctx := GetContext(ginCtx)
	id := ginCtx.Param("id")

	log.Info(ctx).Msg(fmt.Sprintf("Removing device %s", id))

	device, err := controller.service.Get(ctx, id)
	if err != nil {
		HandleError(ctx, ginCtx, err)
		return
	}

	err = controller.service.Remove(ctx, device)
	if err != nil {
		HandleError(ctx, ginCtx, err)
	} else {
		ginCtx.Status(http.StatusNoContent)
	}
}

func (controller *DeviceController) save(ginCtx *gin.Context, id *string, override bool) {
	ctx := GetContext(ginCtx)

	var deviceRequest request.DeviceRequest
	var device entity.Device
	var errw *exceptions.WrappedError

	err := ginCtx.ShouldBindJSON(&deviceRequest)
	if err != nil {
		HandleError(ctx, ginCtx, &exceptions.WrappedError{
			BaseError: exceptions.InvalidJSON,
			Error:     err,
		})
		return
	}

	if id != nil {
		device, errw = controller.service.Get(ctx, *id)
		if errw != nil && !override {
			HandleError(ctx, ginCtx, errw)
			return
		}
		device.ID = *id
	}

	jsonData, _ := json.Marshal(deviceRequest)
	json.Unmarshal(jsonData, &device)

	errw = controller.service.Save(ctx, &device)
	if errw != nil {
		HandleError(ctx, ginCtx, errw)
		return

	} else {
		ginCtx.JSON(http.StatusOK, device)
	}
}
