package request

type DeviceRequest struct {
	Name string `json:"name,omitempty"`
	Mac  string `json:"mac,omitempty"`
}
