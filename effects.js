// Funktion zur Handhabung des Slider-Klicks
function handleSlider(event) {
    // Beim Klick auf den Text darf der Link geöffnet werden
    if (event.target.closest('.slider-landing_page_element_text')) {
        return;
    }

    // Verhindert das Öffnen des Slide-Links
    event.preventDefault();

    // Das Slider-Element, auf das geklickt wurde um die Position zu bestimmen (nicht das Ziel des Klicks)
    const slider = event.currentTarget;

    // Sichtbare Position und Breite des Sliders 
    const sliderRect = slider.getBoundingClientRect();

    // Klickposition innerhalb des Sliders
    const clickX = event.clientX - sliderRect.left;

    // Mitte des Sliders
    const sliderMiddle = sliderRect.width / 2;

    // Alle Radio-Buttons innerhalb dieses Sliders
    const radios = Array.from(
        slider.querySelectorAll('input[name="slider"]')
    );

    // Aktuell ausgewählter Radio-Button definieren
    const currentIndex = radios.findIndex((radio) => radio.checked);

    // Wenn kein Radio-Button ausgewählt ist oder keine Radio-Buttons vorhanden sind, beenden
    if (currentIndex === -1 || radios.length === 0) {
        return;
    }

    // Zielindex basierend auf der Klickposition bestimmen
    let targetIndex;

    if (clickX >= sliderMiddle) {
        // Rechte Hälfte: ein Slide vorwärts
        targetIndex = (currentIndex + 1) % radios.length;
    } else {
        // Linke Hälfte: ein Slide zurück
        targetIndex =
            (currentIndex - 1 + radios.length) % radios.length;
    }

    radios[targetIndex].checked = true;
}

// Event-Listener nur einmal hinzufügen
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider-landing_page');

    if (slider) {
        slider.addEventListener('click', handleSlider);
    }
});
