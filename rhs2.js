function watchPosition() {
  navigator.geolocation.watchPosition(
    (position) => {
      const currentPos = position.coords;
      const distance = calculateDistance(initialPosition.coords, currentPos);

      if (distance > maxDistance) {
        maxDistance = distance;
      }

      // Calculate and update progress
      const progress = Math.min(distance / requiredDistance, 1);
      console.log("distance:", distance);
      console.log("progress:", progress);
      console.log("progress width:", progress * 100 + "%");
      distanceElement.textContent = `Distance moved: ${Math.round(distance)} meters`;
      document.getElementById('distanceProgress').style.width = `${progress * 100}%`;
    },
    // ... error handler
  );
}
