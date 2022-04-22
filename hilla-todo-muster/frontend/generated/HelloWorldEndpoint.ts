/**
 * This module is generated from HelloWorldEndpoint.java
 * All changes to this file are overridden. Please consider to make changes in the corresponding Java file if necessary.
 * @see {@link file:///C:/Code/git/anderscore/goldschmiede/hilla-goldschmiede/hilla-todo-muster/src/main/java/com/example/application/endpoints/helloworld/HelloWorldEndpoint.java}
 * @module HelloWorldEndpoint
 */

// @ts-ignore
import client from './connect-client.default';

function _sayHello(
 name: string
): Promise<string> {
 return client.call('HelloWorldEndpoint', 'sayHello', {name});
}
export {
  _sayHello as sayHello,
};
