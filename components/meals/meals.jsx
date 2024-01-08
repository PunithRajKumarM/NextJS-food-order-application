import React, { useEffect, useState } from "react";
import { foodData } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import classes from "./meals.module.css";
import { currencyFormatter } from "@/currencyFormatter/currencyFormatter";

export default function MealsPage() {
  return (
    <div className={classes.mealsPage}>
      <h1>Browse to taste delicious meal!</h1>
      <div className={classes.mealsList}>
        {foodData.map((meal) => (
          <Link
            href={`/meals/${meal.slug}`}
            key={meal.mealName}
            className={classes.meals}
          >
            <h2>{meal.mealName}</h2>
            <Image
              src={meal.src}
              alt="meal"
              width={300}
              height={280}
              priority
            />
            <h4 className={classes.mealsDescription}>{meal.description}</h4>
            <p className={classes.mealsPrice}>
              {currencyFormatter(meal.price)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
