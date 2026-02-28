interface ProjectCarouselProps {
  images: string[];
  carouselId: string;
}

export default function ProjectCarousel({
  images,
  carouselId,
}: ProjectCarouselProps) {
  const uniqueId = `carousel-${carouselId}`;

  return (
    <div
      id={uniqueId}
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ zIndex: 350 }}
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target={`#${uniqueId}`}
            data-bs-slide-to={i}
            className={i === 0 ? 'active' : ''}
            aria-current={i === 0 ? 'true' : undefined}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {images.map((img, i) => (
          <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
            <img
              src={`/images/${img}`}
              className="d-block card-img-top"
              alt={`Slide ${i + 1}`}
              style={{ maxHeight: '320px' }}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows (only show if multiple images) */}
      {images.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${uniqueId}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${uniqueId}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}
