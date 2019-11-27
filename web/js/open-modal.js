var currentShowingModal = document.getElementById("common");
function showModal(modalToShow) {
    // modalToShow.style.display = "block";
    switch (modalToShow) {
        case "common":
            currentShowingModal.style.display = "none";
            //assign showing modal
            currentShowingModal = document.getElementById("common");
            currentShowingModal.style.display = "block";
            break;
        case "solar_modal":
            currentShowingModal.style.display = "none";
            //assign showing modal
            currentShowingModal = document.getElementById("solar_modal");
            currentShowingModal.style.display = "block";
            break;
        case "ev_modal":
            currentShowingModal.style.display = "none";
            //assign showing modal
            currentShowingModal = document.getElementById("ev_modal");
            currentShowingModal.style.display = "block";
            break;
        case "battery_modal":
            currentShowingModal.style.display = "none";
            //assign showing modal
            currentShowingModal = document.getElementById("battery_modal");
            currentShowingModal.style.display = "block";
            break;
        case "light_modal":
            currentShowingModal.style.display = "none";
            //assign showing modal
            currentShowingModal = document.getElementById("light_modal");
            currentShowingModal.style.display = "block";
            break;
    }
}
