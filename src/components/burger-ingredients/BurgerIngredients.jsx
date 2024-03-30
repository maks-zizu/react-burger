import React, { useEffect, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from "./ingredients.module.css";
import IngredientsList from "./IngredientsList";
import { filterIngredientsByType, prepareSections } from "./utils";
import { useSelector } from "react-redux";
import useTabNavigation from "../../hooks/useTabNavigation";
import { throttle } from "lodash";
import { tabs } from "./templates";

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.ingredients.ingredientsData);
  const { current, scrollToSection, setRef, setCurrent, sectionRefs } =
    useTabNavigation("bun");
  const ingredientsRef = useRef(null);

  const { bunIngredients, sauceIngredients, mainIngredients } = useMemo(() => {
    const bun = filterIngredientsByType(ingredients, "bun");
    const sauce = filterIngredientsByType(ingredients, "sauce");
    const main = filterIngredientsByType(ingredients, "main");
    return {
      bunIngredients: bun,
      sauceIngredients: sauce,
      mainIngredients: main,
    };
  }, [ingredients]);

  const sections = useMemo(
    () => prepareSections(bunIngredients, sauceIngredients, mainIngredients),
    [bunIngredients, sauceIngredients, mainIngredients]
  );

  // const handleIngredientClick = useCallback(
  //   (ingredient) => {
  //     openModal(ingredient);
  //   },
  //   [openModal]
  // );

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = ingredientsRef.current.scrollTop;
      const positions = Object.keys(sectionRefs.current).map((key) => ({
        type: key,
        top: sectionRefs.current[key].offsetTop - 40,
      }));

      const activeSection = positions.reduce((closest, current) => {
        if (closest === null) return current;
        if (
          Math.abs(current.top - scrollPosition) <
          Math.abs(closest.top - scrollPosition)
        ) {
          return current;
        }
        return closest;
      }, null);

      if (activeSection) {
        setCurrent(activeSection.type);
      }
    }, 100);

    const currentRef = ingredientsRef.current;
    currentRef.addEventListener("scroll", handleScroll);

    return () => {
      handleScroll.cancel();
      currentRef.removeEventListener("scroll", handleScroll);
    };
  }, [setCurrent, sectionRefs]);

  return (
    <section className={ingredientsStyle.ingredients_section}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={ingredientsStyle.tabs}>
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            active={current === tab.value}
            onClick={() => scrollToSection(tab.value)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      <div className={ingredientsStyle.ingredients_lists} ref={ingredientsRef}>
        {sections.map(({ type, ingredients, name }) => (
          <IngredientsList
            key={type}
            listRef={setRef(type)}
            type={name}
            ingredients={ingredients}
          />
        ))}
      </div>
    </section>
  );
}

export default BurgerIngredients;
