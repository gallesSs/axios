import s from "./Find.module.css";
function Find() {
  return (
    <div className={s.find}>
      <div className={`container ${s.wrapper}`}>
        <span className={s.tag}>/05</span>
        <div className={s.content}>
          <h2 className={s.title}>
            Find a home <br /> that feels like yours.
          </h2>
          <p className={s.text}>
            Explore our collection of modular homes or tell us what you are
            looking to build.
          </p>
        </div>
        <button className={s.button}>
          EXPLORE THE COLLECTION
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none">
            <path
              d="M12.25 7L7.875 2.625L7.25813 3.24187L10.5744 6.5625L1.75 6.5625V7.4375L10.5744 7.4375L7.25813 10.7581L7.875 11.375L12.25 7Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Find;
