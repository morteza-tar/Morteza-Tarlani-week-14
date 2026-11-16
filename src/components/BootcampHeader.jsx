function BootcampHeader() {
  return (
    <div className="bootcamp-header">
      <div className="bootcamp-label">BOOTCAMP PROJECT</div>
      <h2>پروژه تمرینی بوت‌کمپ</h2>
      <div className="bootcamp-info">
        <span>مدرس: میلاد عظمی</span>
        <span className="bootostart-wrapper">
          <a
            href="https://botostart.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="botostart"
          >
            <span className="botostart-icon">✦</span>
           Botostart.ir
            <span className="botostart-arrow">↗</span>
          </a>
        </span>
        <span>تمرین هفته چهاردهم</span>
      </div>
    </div>
  );
}

export default BootcampHeader;
