package entity

import (
	"time"
)

type Device struct {
	ID        string    `json:"id" bson:"id"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt"`

	Name string `json:"name,omitempty" bson:"name,omitempty"`
	Mac  string `json:"mac,omitempty" bson:"mac,omitempty"`
}
