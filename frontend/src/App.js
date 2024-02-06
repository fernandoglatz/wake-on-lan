import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import apiService from "./ApiService";

function App() {
  let emptyDevice = {
    id: null,
    name: "",
    mac: "",
  };

  const [fetchDevices, setFetchDevices] = useState(false);
  const [devices, setDevices] = useState(null);
  const [deviceDialog, setDeviceDialog] = useState(false);
  const [deleteDeviceDialog, setDeleteDeviceDialog] = useState(false);
  const [deleteDevicesDialog, setDeleteDevicesDialog] = useState(false);
  const [device, setDevice] = useState(emptyDevice);
  const [selectedDevices, setSelectedDevices] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const msgs = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setFetchDevices(true);
  }, []);

  useEffect(() => {
    if (fetchDevices) {
      setFetchDevices(false);
      apiService
        .get("device")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error("No data");
          }
        })
        .then((data) => {
          setDevices(data);
        })
        .catch((error) => {
          console.log(error);
          msgs.current.show({
            severity: "error",
            summary: "Oops!",
            detail: "Service unavailable: " + error.message,
          });
        });
    }
  }, [fetchDevices]);

  const openNew = () => {
    setDevice(emptyDevice);
    setSubmitted(false);
    setDeviceDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setDeviceDialog(false);
  };

  const hideDeleteDeviceDialog = () => {
    setDeleteDeviceDialog(false);
  };

  const hideDeleteDevicesDialog = () => {
    setDeleteDevicesDialog(false);
  };

  const saveDevice = () => {
    setSubmitted(true);

    //TODO Fernando suspeito
    if (device.name.trim()) {
      if (device.id) {
        apiService
          .post("device/" + device.id, device)
          .then(() => {
            toast.current.show({
              severity: "success",
              summary: "Success!",
              detail: "Device updated",
            });
          })
          .catch((error) => {
            console.log(error);
            msgs.current.show({
              severity: "error",
              summary: "Oops!",
              detail: "Service unavailable",
            });
          });
      } else {
        apiService
          .put("device", device)
          .then(() => {
            toast.current.show({
              severity: "success",
              summary: "Success!",
              detail: "Device created",
            });
          })
          .catch((error) => {
            console.log(error);
            msgs.current.show({
              severity: "error",
              summary: "Oops!",
              detail: "Service unavailable",
            });
          });
      }

      setFetchDevices(true);
      hideDialog();
    }
  };

  const wakeOnDevice = (device) => {
    apiService
    .wakeOn("device/" + device.id+"/wake-on")
    .then((response) => {
      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "Success!",
          detail: "Device deleted",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      msgs.current.show({
        severity: "error",
        summary: "Oops!",
        detail: "Service unavailable",
      });
    });
  };

  const editDevice = (device) => {
    setDevice({ ...device });
    setDeviceDialog(true);
  };

  const confirmDeleteDevice = (device) => {
    setDevice(device);
    setDeleteDeviceDialog(true);
  };

  const deleteDevice = () => {
    apiService
      .delete("device/" + device.id)
      .then((response) => {
        if (response.ok) {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail: "Device deleted",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        msgs.current.show({
          severity: "error",
          summary: "Oops!",
          detail: "Service unavailable",
        });
      });

    setFetchDevices(true);
    hideDeleteDeviceDialog();
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteDevicesDialog(true);
  };

  const deleteSelectedDevices = () => {
    let _devices = devices.filter((val) => !selectedDevices.includes(val));
    setDevices(_devices);
    setDeleteDevicesDialog(false);
    setSelectedDevices(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Devices Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _device = { ...device };
    _device[`${name}`] = val;

    setDevice(_device);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-power-off"
          className="p-button-rounded p-button-primary mr-2"
          onClick={() => wakeOnDevice(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editDevice(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteDevice(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
      <span className="p-input-icon-left w-full md:w-auto">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-full lg:w-auto"
        />
      </span>
      <div className="mt-3 md:mt-0 flex justify-content-end">
        <Button
          icon="pi pi-plus"
          className="mr-2 p-button-rounded"
          onClick={openNew}
          tooltip="New"
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger mr-2 p-button-rounded"
          onClick={confirmDeleteSelected}
          disabled={!selectedDevices || !selectedDevices.length}
          tooltip="Delete"
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          icon="pi pi-upload"
          className="p-button-help p-button-rounded"
          onClick={exportCSV}
          tooltip="Export"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
    </div>
  );
  const deviceDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button label="Save" icon="pi pi-check" onClick={saveDevice} />
    </React.Fragment>
  );

  const deleteDeviceDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDeviceDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteDevice}
      />
    </React.Fragment>
  );

  const deleteDevicesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDevicesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedDevices}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
      <Toast ref={toast} />
      <Messages ref={msgs} />

      <div className="text-3xl text-800 font-bold mb-4">Devices</div>

      <DataTable
        ref={dt}
        value={devices}
        selection={selectedDevices}
        onSelectionChange={(e) => setSelectedDevices(e.value)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} devices"
        globalFilter={globalFilter}
        header={header}
        responsiveLayout="scroll"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          exportable={false}
        ></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="mac" header="MAC" sortable></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
          className="text-right"
        ></Column>
      </DataTable>

      <Dialog
        visible={deviceDialog}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "40vw" }}
        header="Device Details"
        modal
        className="p-fluid"
        footer={deviceDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={device.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !device.name })}
          />
          {submitted && !device.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="mac">MAC</label>
          <InputText
            id="mac"
            value={device.mac}
            onChange={(e) => onInputChange(e, "mac")}
            required
            className={classNames({ "p-invalid": submitted && !device.mac })}
          />
          {submitted && !device.mac && (
            <small className="p-error">MAC is required.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteDeviceDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDeviceDialogFooter}
        onHide={hideDeleteDeviceDialog}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {device && (
            <span>
              Are you sure you want to delete <b>{device.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteDevicesDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDevicesDialogFooter}
        onHide={hideDeleteDevicesDialog}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {device && (
            <span>Are you sure you want to delete the selected devices?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default App;
