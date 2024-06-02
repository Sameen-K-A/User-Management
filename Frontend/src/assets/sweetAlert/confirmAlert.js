import Swal from "sweetalert2";
import "../style/swal.css";

const confirmAlert = (content) => {
  return Swal.fire({
    html: `<div class="custom-text">${content}</div>`,
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    position: "bottom-right",
    customClass: {
      popup: 'custom-width',
      confirmButton: 'confirm-btn',
      cancelButton: 'cancel-btn'
    },
    buttonsStyling: false
  })
}

export default confirmAlert;