interface ISteaps {
  activeStep: number;
}

export const Steps = (props: ISteaps) => {
  const { activeStep } = props;

  return (
    <ol className="steps">
      {[1, 2, 3, 4].map((step) => {
        return (
          <li
            key={`step-${step}`}
            className={step <= activeStep ? "active" : ""}
          >
            <button disabled></button>
          </li>
        );
      })}
    </ol>
  );
};
