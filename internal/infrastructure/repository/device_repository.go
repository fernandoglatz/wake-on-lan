package repository

import (
	"context"
	"fernandoglatz/wake-on-lan/internal/core/common/utils"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/constants"
	"fernandoglatz/wake-on-lan/internal/core/common/utils/exceptions"
	"fernandoglatz/wake-on-lan/internal/core/entity"
	"strings"
	"time"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type DeviceRepository struct {
	collection *mongo.Collection
}

func NewDeviceRepository() *DeviceRepository {
	return &DeviceRepository{
		collection: utils.MongoDatabase.GetCollection("device"),
	}
}

func (repository *DeviceRepository) Get(ctx context.Context, id string) (entity.Device, *exceptions.WrappedError) {
	filter := bson.M{"id": id}
	return repository.getByFilter(ctx, filter)
}

func (repository *DeviceRepository) getByFilter(ctx context.Context, filter interface{}) (entity.Device, *exceptions.WrappedError) {
	var device entity.Device

	err := repository.collection.FindOne(ctx, filter).Decode(&device)
	if err == mongo.ErrNoDocuments {
		return device, &exceptions.WrappedError{
			BaseError: exceptions.RecordNotFound,
		}
	} else if err != nil {
		return device, &exceptions.WrappedError{
			Error: err,
		}
	}

	repository.correctTimezone(&device)
	return device, nil
}

func (repository *DeviceRepository) GetAll(ctx context.Context) ([]entity.Device, *exceptions.WrappedError) {
	var devices []entity.Device = []entity.Device{}

	cursor, err := repository.collection.Find(ctx, bson.D{})
	if err != nil {
		return devices, &exceptions.WrappedError{
			Error: err,
		}
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var device entity.Device
		err = cursor.Decode(&device)
		if err != nil {
			return devices, &exceptions.WrappedError{
				Error: err,
			}
		}

		repository.correctTimezone(&device)
		devices = append(devices, device)
	}

	return devices, nil
}

func (repository *DeviceRepository) Save(ctx context.Context, device *entity.Device) *exceptions.WrappedError {
	now := time.Now()
	device.UpdatedAt = now

	if len(device.ID) == constants.ZERO {
		uuidObj, _ := uuid.NewRandom()
		uuidStr := uuidObj.String()
		device.ID = strings.Replace(uuidStr, "-", "", -1)
	}

	if device.CreatedAt.IsZero() {
		device.CreatedAt = now

		_, err := repository.collection.InsertOne(ctx, device)
		if err != nil {
			return &exceptions.WrappedError{
				Error: err,
			}
		}

	} else {
		filter := bson.M{"id": device.ID}
		_, err := repository.collection.ReplaceOne(ctx, filter, device)
		if err != nil {
			return &exceptions.WrappedError{
				Error: err,
			}
		}
	}

	return nil
}

func (repository *DeviceRepository) Remove(ctx context.Context, device entity.Device) *exceptions.WrappedError {
	filter := bson.M{"id": device.ID}
	_, err := repository.collection.DeleteOne(ctx, filter)
	if err != nil {
		return &exceptions.WrappedError{
			Error: err,
		}
	}

	return nil
}

func (repository *DeviceRepository) correctTimezone(device *entity.Device) {
	location, _ := time.LoadLocation(utils.GetTimezone())
	device.CreatedAt = device.CreatedAt.In(location)
	device.UpdatedAt = device.UpdatedAt.In(location)
}
