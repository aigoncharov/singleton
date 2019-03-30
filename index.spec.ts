import { singleton, Singleton, SINGLETON_KEY } from './index'

describe('singleton', () => {
  test('makes class a singleton', () => {
    @singleton
    class Test {}

    const instance1 = new Test()
    const instance2 = new Test()
    expect(instance1).toBe(instance2)
    const instanceSingleton = (Test as Singleton<typeof Test>)[SINGLETON_KEY]
    expect(instanceSingleton).toBe(instance1)
  })
  test('makes class a singleton - non-decorator based', () => {
    class Test {}
    const TestSingleton = singleton(Test)

    const instance1 = new TestSingleton()
    const instance2 = new TestSingleton()
    expect(instance1).toBe(instance2)
    const instanceSingleton = (TestSingleton as Singleton<typeof TestSingleton>)[SINGLETON_KEY]
    expect(instanceSingleton).toBe(instance1)
  })
  test("doesn't make child class a singleton", () => {
    @singleton
    class Parent {}
    class Child extends Parent {}

    const instance1 = new Child()
    const instance2 = new Child()
    expect(instance1).not.toBe(instance2)
    const instanceSingleton = (Parent as Singleton<typeof Parent>)[SINGLETON_KEY]
    expect(instanceSingleton).toBe(undefined)
  })
})
