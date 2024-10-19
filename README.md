# BigSerializer

**BigSerializer** is a lightweight, easy and ready-to-use complex data
serializer/deserializer library.

### Features

While other projects can serialize values without problems, is common to see
loss of information on final deserialized objects, also are hard to implement
and generates some boilerplate on our projects.

**BigSerializer** exports 2 functions and 1 decorator that will help you to
serialize all the data that your project needs.

✅ Generate a full JSON stringifable object from any correct value. ✅ Preserve
references. ✅ Regenerate class instances.

### Limitations

❌ Just can serialize and decode classes that are decorated with the
`@Serializable()` decorator. ❌ Still not supporting binary arrays. ❌ Still not
supporting `Set` and `Map` datatypes. ❌ Still not supporting buffers.

### Exports

#### Serializable Decorator

Creates a serializable class.

#### serializeValue Function

Creates a new serialized value from an argument, this argument can be almost
anything.

#### deserializeValue Function

Creates a new value from a previous serialized value.

```ts
import { deserializeValue, Serializable, serializeValue } from "BigSerializer";

@Serializable()
class Entity {
  public readonly creationDate = new Date();
  constructor(public readonly type: string, public readonly name: string) {}

  // This is not needed... it is just to make tests easier!!
  toPlain() {
    return {
      type: this.type,
      name: this.name,
    };
  }
}

const entityMateo = new Entity("human", "Mateo");
const serializedMateo = serializeValue(entityMateo); // Object, JSON serializable.
// Sorry, but I don't do magic, type the return is your work!
const deserializedMateo = deserializeValue<Entity>(serializedMateo);

console.log(deserializedMateo instanceof Entity); // True!
console.log(deserializedMateo.toPlain().type === entityMateo.type); // True!
console.log(deserializedMateo.toPlain().name === entityMateo.name); // True!
console.log(
  deserializedMateo.creationDate.toISOString() ===
    entityMateo.creationDate.toISOString(),
); // True!
console.log(deserializedMateo === entityMateo); // False!
```
