import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import deviceService from "./DeviceService";

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
  const [device, setDevice] = useState(emptyDevice);
  const [selectedDevices, setSelectedDevices] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setFetchDevices(true);

    console.log('process.env.PUBLIC_URL: ' + process.env.PUBLIC_URL); 
    console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV); 
    console.log('process.env.REACT_APP_API_ENDPOINT: ' + process.env.REACT_APP_API_ENDPOINT); 
    console.log('process.env.REACT_APP_ENVIRONMENT: ' + process.env.REACT_APP_ENVIRONMENT); 
  }, []);

  useEffect(() => {
    if (fetchDevices) {
      setFetchDevices(false);

      deviceService
        .getAll()
        .then((devices) => {
          setDevices(devices);
        })
        .catch((error) => {
          showErrorMessage(error);
        });
    }
  }, [fetchDevices]);

  const showErrorMessage = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Oops!",
      detail: error.message,
      sticky: true,
    });
  };

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

  const saveDevice = () => {
    setSubmitted(true);

    if (device.name && device.mac) {
      deviceService
        .save(device)
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Success!",
            detail: "Device saved",
          });

          setFetchDevices(true);
          hideDialog();
        })
        .catch((error) => {
          showErrorMessage(error);
        });
    }
  };

  const wakeOnDevice = (device) => {
    deviceService
      .wakeOn(device)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success!",
          detail: "Device waked on",
        });
      })
      .catch((error) => {
        showErrorMessage(error);
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
    deviceService
      .remove(device)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success!",
          detail: "Device deleted",
        });
      })
      .catch((error) => {
        showErrorMessage(error);
      });

    setFetchDevices(true);
    hideDeleteDeviceDialog();
  };

  const exportCSV = () => {
    dt.current.exportCSV();
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

  return (
    <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
      <Toast ref={toast} />

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
        header="Device details"
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
            autoFocus
            className={classNames({ "p-invalid": submitted && !device.name })}
          />
          {submitted && !device.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="mac">MAC</label>
          <InputMask
            id="mac"
            value={device.mac}
            onChange={(e) => onInputChange(e, "mac")}
            mask="**:**:**:**:**:**"
            placeholder="  :  :  :  :  :  "
            className={classNames({ "p-invalid": submitted && !device.mac })}
            style={{ "text-transform": "uppercase" }}
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
    </div>
  );
}

export default App;
