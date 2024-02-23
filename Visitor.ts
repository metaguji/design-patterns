/*
Visitor Pattern
- Separates the algorithm from the object structure
- Allows for adding new behaviours without changing the classes themselves
*/

interface Product {
  accept(visitor: ProductVisitor): void;
}

interface ProductVisitor {
  visitBigItem(bigItem: BigItem): void;
  visitMediumItem(mediumItem: MediumItem): void;
  visitSmallItem(smallItem: SmallItem): void;
}

class BigItem implements Product {
  accept(visitor: ProductVisitor): void {
    visitor.visitBigItem(this);
  }
}

class MediumItem implements Product {
  accept(visitor: ProductVisitor): void {
    visitor.visitMediumItem(this);
  }
}

class SmallItem implements Product {
  accept(visitor: ProductVisitor): void {
    visitor.visitSmallItem(this);
  }
}

class SpecialProduct implements ProductVisitor {
  visitBigItem(bigItem: BigItem): void {
    console.log("This is a special big item!");
  }
  visitMediumItem(mediumItem: MediumItem): void {
    console.log("This is a special medium item!");
  }
  visitSmallItem(smallItem: SmallItem): void {
    console.log("This is a special small item!");
  }
}

class SuperSpecialProduct implements ProductVisitor {
  visitBigItem(bigItem: BigItem): void {
    console.log("This is a super special big item!");
  }
  visitMediumItem(mediumItem: MediumItem): void {
    console.log("This is a super special medium item!");
  }
  visitSmallItem(smallItem: SmallItem): void {
    console.log("This is a super special small item!");
  }
}

const bigItem = new BigItem();
const mediumItem = new MediumItem();
const smallItem = new SmallItem();

const specialProduct = new SpecialProduct();

bigItem.accept(specialProduct);
mediumItem.accept(specialProduct);
smallItem.accept(specialProduct);

const superSpecialProduct = new SuperSpecialProduct();

bigItem.accept(superSpecialProduct);
mediumItem.accept(superSpecialProduct);
smallItem.accept(superSpecialProduct);

// function visit(_components: Product[], _visitor: ProductVisitor) {
//   for (const component of _components) {
//     component.accept(_visitor);
//   }
// }

// const components = [new BigItem(), new MediumItem(), new SmallItem()];

// const specialProductVisitor = new SpecialProduct();
// const superSpecialProductVisitor = new SuperSpecialProduct();

// visit(components, specialProductVisitor);
// visit(components, superSpecialProductVisitor);
