import Alert from "react-bootstrap/Alert";

export default function AlertComponent(props) {
  if (props.show) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Alert
          variant={props.variant}
          onClose={props.handleShowAlert}
          dismissible
        >
          <p>{props.message}</p>
        </Alert>
      </div>
    );
  }
}
