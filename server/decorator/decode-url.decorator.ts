export const DecodeUrl = (): PropertyDecorator => {
  return (targetClassPrototype: Record<string | symbol, any>, attrname: string | symbol) => {
    console.log(targetClassPrototype); // CustomerService: {}
    console.log(attrname); // custname

    // targetClassPrototype[attrname] = value;
    targetClassPrototype["otherName"] = "xi";

    console.log(targetClassPrototype[attrname]);

    return targetClassPrototype[attrname];
  };
};
