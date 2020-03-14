const animation = () => {
  const viewIn = () => {
    anime({
      targets: "canvas",
      scale: [0, 1]
    }),
      anime({
        targets: "#list li, .arrow",
        translateY: ["+=600px", "0"],
        delay: anime.stagger(55)
      });
  };

  const valueIn = () => {
    anime({
      targets: ".valueItem",
      translateX: ["-=1200px", "0%"],
      duration: 1200,
      easing: "spring(1, 100, 13, 30)"
    });
  };

  const valueOut = () => {
    anime({
      targets: ".valueItem",
      translateX: ["0%", "+=1200px"],
      duration: 1200,
      easing: "spring(1, 100, 13, 30)"
    });
  };

  const viewOut = () => {
    return (
      anime({
        targets: "canvas",
        scale: [1, 0],
        duration: 250
      }),
      anime({
        targets: "#list li, .arrow",
        translateY: ["0%", "+=600px"],
        delay: anime.stagger(55),
        duration: 250
      }).finished
    );
  };

  const modalIn = modal => {
    anime({
      targets: modal,
      translateY: ["-=900px", "0%"]
    });
  };

  const modalOut = modal => {
    return anime({
      targets: modal,
      translateY: ["0%", "+=900px"],
      duration: 900
    }).finished;
  };
  return { viewIn, viewOut, valueIn, valueOut, modalIn, modalOut };
};
export default animation;
