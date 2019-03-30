<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [singleton](#singleton)
  - [Installation](#installation)
  - [Quick start](#quick-start)
  - [Usage without decorators](#usage-without-decorators)
  - [Inheritance](#inheritance)
  - [In depth](#in-depth)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# singleton

Singleton. No constructor monkeypatching. Zero dependencies. Built with TypeScript.

## Installation

1.  Run
    ```sh
    npm i @keenondrums/singleton
    ```
1.  **(Optional)** Enable decorators

    1. If you use TypeScript set in you tsconfig.json

       ```json
       {
         "compilerOptions": {
           "experimentalDecorators": true
         }
       }
       ```

    1. If you use JavaScript configure your babel to support decorators and class properties

## Quick start

```ts
import { singleton } from '@keenondrums/singleton'

@singleton
class Test {}

new Test() === new Test() // returns `true`
```

## Usage without decorators

```ts
import { singleton } from '@keenondrums/singleton'

class Test {}
const TestSingleton = singleton(Test)

new TestSingleton() === new TestSingleton() // returns `true`
```

## Inheritance

Any child of your singleton will not be a singleton.

```ts
import { singleton } from '@keenondrums/singleton'

@singleton
class Parent {}

class Child extends Parent {}

new Child() === new Child() // returns `false`

// If you want to make `Child` a singleton as well, apply `singleton` decorator directly to it
@singleton
class ChildSingleton extends Parent {}

new ChildSingleton() === new ChildSingleton() // returns `true`
```

## In depth

`singleton` decorator wraps your class with a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and a [construct trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct) to override class' creation logic.

Your singleton instance is always available as a static property of a class by key `SINGLETON_KEY`.

```ts
import { singleton, SINGLETON_KEY } from '@keenondrums/singleton'

@singleton
class Test {}

const instance = new Test()
Test[SINGLETON_KEY] === instance // returns `true`
```
