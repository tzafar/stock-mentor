/*Decorators in TypeScript provide a way to perform metaprogramming. They are a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

Types of Decorators
There are several types of decorators available in TypeScript:

Class Decorators — Applied to class declarations.
Method Decorators — Applied to methods within the class.
Accessor Decorators — Applied to accessor methods (get/set) within the class.
Property Decorators — Applied to properties of the class.
Parameter Decorators — Applied to parameters in class constructors.
Enabling Decorators
To use decorators in TypeScript, you need to enable them in your tsconfig.json by setting the experimentalDecorators option to true:

json
Copy code
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
/*Class Decorators
A class decorator is declared just before a class declaration and is applied to the constructor of the class. It can be used to observe, modify, or replace a class definition.

Example:

typescript
Copy code*/
function sealed(constructor: Function) {
    console.log('Sealing the constructor');
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
/*In this example, the @sealed decorator will seal both the constructor and its prototype, preventing new properties from being added to them.

Method Decorators
Method decorators are applied to the property descriptors of methods. They are used to observe, modify, or replace method definitions.

Example:

typescript
Copy code*/
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }

//     @enumerable(false)
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }
/*The @enumerable(false) decorator here makes the greet method non-enumerable.

Accessor and Property Decorators
Accessor and property decorators are similar to method decorators and can modify the behavior of a property or accessor.

Example of Property Decorator:

typescript
Copy code*/
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        let value: string;

        const getter = function () {
            return formatString.replace("%s", value);
        };

        const setter = function (newVal: string) {
            value = newVal;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

class Person {
    @format("Hello, %s")
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
/*In this example, the @format decorator changes how the name property is set and retrieved, incorporating a string format.

Parameter Decorators
Parameter decorators are applied to parameters in a class constructor or method and can be used to inject or modify parameters.

Example:

typescript
Copy code*/
function logParameter(target: any, key: string, index: number) {
    var metadataKey = `log_${key}_parameters`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    } else {
        target[metadataKey] = [index];
    }
}

class Cow {
    greet(@logParameter message: string) {
        console.log(message);
    }
}
/*This @logParameter decorator logs information about the parameter index when a method is called.

Conclusion
Decorators provide powerful and expressive features in TypeScript, allowing developers to add additional behavior to classes, methods, properties, and parameters in a declarative way. They are broadly used in Angular for defining components, services, and more.
*/

function firstDecorator() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`second decorator called on ${target} its type is ${typeof target} propertyKey is ${propertyKey} property descriptor is ${descriptor}`);
    };
}

function secondDecorator() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`second decorator called on ${target} its type is ${typeof target} propertyKey is ${propertyKey} property descriptor is ${descriptor}`);
    }
}


class DecoratorTest {

    @firstDecorator()
    @secondDecorator()
    sayMyName() {

    }
}

let decoratorTest: DecoratorTest = new DecoratorTest();
decoratorTest.sayMyName();

function salamGreetings(target: any, methodKey: string, parameterIndex: number) {
    console.log(`The target is ${JSON.stringify(target)} the methodKey is ${methodKey} the parameterIndex is ${parameterIndex}`)
    target = 'Assalam-o-Alaikum' + target.value;
}

class Banda {
    sayGreetingsWith(@salamGreetings name: string) {
        return name;
    }
}


console.log(new Banda().sayGreetingsWith('Toseef'));