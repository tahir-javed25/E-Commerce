import { filterOptions } from "@/config";
import React, { Fragment, useEffect } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const Filters = ({ filter, handleFilter }) => {


  return (
    <section className="bg-background border-r rounded-lg shadow-sm">
      <div className="p-4">
        <h1 className="text-xl font-bold ">Filters</h1>
      </div>
      <Separator />
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <h2 className="text-l font-bold "> {keyItem.toUpperCase()} </h2>
            <div className="grid gap-2">
              {filterOptions[keyItem].map((option) => (
                <Label className="flex gap-2" key={option.id}>
                  <Checkbox
                    checked={
                       filter &&
                        Object.keys(filter).length > 0 &&
                        filter[keyItem] &&
                        filter[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default Filters;
