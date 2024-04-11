import React, { useEffect, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from "./ingredients.module.css";
import IngredientsList from "./IngredientsList";
import { filterIngredientsByType, prepareSections } from "./utils";
import useTabNavigation, { SectionType } from "../../hooks/useTabNavigation";
import { throttle } from "lodash";
import { tabs } from "./templates";
import { useAppSelector } from "../../services/store";

function BurgerIngredients() {
  const ingredients = useAppSelector(
    (store) => store.ingredients.ingredientsData
  );
  const { current, scrollToSection, setRef, setCurrent, sectionRefs } =
    useTabNavigation("bun");
  const ingredientsRef = useRef<HTMLDivElement>(null);

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
      const scrollPosition = ingredientsRef.current?.scrollTop ?? 0;
      const positions = Object.keys(sectionRefs.current).map((key) => {
        const section =
          sectionRefs.current[key as keyof typeof sectionRefs.current];
        return {
          type: key,
          top: section ? section.offsetTop - 40 : 0,
        };
      });

      const activeSection = positions.reduce((closest, current) => {
        if (
          closest === null ||
          Math.abs(current.top - scrollPosition) <
            Math.abs(closest.top - scrollPosition)
        ) {
          return current;
        }
        return closest;
      }, null as { type: string; top: number } | null);

      if (activeSection) {
        setCurrent(activeSection.type as SectionType);
      }
    }, 100);

    const currentRef = ingredientsRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => {
        handleScroll.cancel();
        currentRef.removeEventListener("scroll", handleScroll);
      };
    }
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
            onClick={() => scrollToSection(tab.value as SectionType)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      <div className={ingredientsStyle.ingredients_lists} ref={ingredientsRef}>
        {sections.map(({ type, ingredients, name }) => (
          <IngredientsList
            key={type}
            listRef={setRef(type as SectionType)}
            type={name}
            ingredients={ingredients}
          />
        ))}
      </div>
    </section>
  );
}

export default BurgerIngredients;
