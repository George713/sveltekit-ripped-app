/*
 * This file is a wrapper for localStorage.
 * Source: https://github.com/Rich-Harris/local-storage-test/blob/main/src/lib/storage.svelte.ts
 */

import { tick } from 'svelte';

export class LocalStorage<T> {
    #key: string; // unique key for storing in localStorage
    #version = $state(0); // keeps track of changes, responsible for reactivity
    #listeners = 0;
    #value: T | undefined; // the actual stored value

    // An event handler for storage events. Applied below in effects as event listener.
    #handler = (e: StorageEvent) => {
        if (e.storageArea !== localStorage) return;
        if (e.key !== this.#key) return;

        this.#version += 1;
    };

    constructor(key: string, initial?: T) {
        this.#key = key;
        this.#value = initial;

        if (typeof localStorage !== 'undefined') {
            if (localStorage.getItem(key) === null) {
                localStorage.setItem(key, JSON.stringify(initial));
            }
        }
    }

    get current() {
        this.#version; // ensures reactivity

        // Get the root value from localStorage or the initial value, if localStorage is unavailable
        const root =
            typeof localStorage !== 'undefined'
                ? JSON.parse(localStorage.getItem(this.#key) as any)
                : this.#value;

        /*
        * Create a proxy for the root value to ensure reactivity.
        * A proxy is a wrapper for an object that intercepts and
        * controls access to its properties.
        * The WeakMap is used to store the proxies for the objects
        * in the root value. The WeakMap is used instead of a
        * Map to avoid memory leaks.
        */
        const proxies = new WeakMap();

        // This function creates proxies
        const proxy = (value: unknown) => {
            // If the value is not an object, return it as is
            if (typeof value !== 'object' || value === null) {
                return value;
            }

            // Try to retrieve object from proxies
            let p = proxies.get(value);

            // If the object is not in proxies, create a new proxy
            if (!p) {
                p = new Proxy(value, {
                    get: (target, property) => {
                        this.#version; // ensures reactivity
                        /*
                        * Recursively create proxies for the properties of the object.
                        * Crucially, it then recursively calls proxy() on the retrieved value.
                        * This is how deep reactivity is achieved.
                        */
                        return proxy(Reflect.get(target, property));
                    },
                    set: (target, property, value) => {
                        this.#version += 1;
                        Reflect.set(target, property, value);

                        /*
                        * Update localStorage.
                        * This is where the actual storage happens.
                        */
                        if (typeof localStorage !== 'undefined') {
                            localStorage.setItem(this.#key, JSON.stringify(root));
                        }

                        return true;
                    }
                });

                // Set the new proxy
                proxies.set(value, p);
            }

            // Return the proxy
            return p;
        };

        /*
        * $effect.tracking() checks if the current getter is being accessed from
        * within a reactive context (like a Svelte component's script or template,
        * or another $effect).
        * If it is, this sets up a Svelte effect. This effect is responsible for
        * managing the global storage event listener.
        */
        if ($effect.tracking()) {
            $effect(() => {
                if (this.#listeners === 0) {
                    window.addEventListener('storage', this.#handler);
                }

                this.#listeners += 1;

                /*
                * Returns a cleanup function that removes the event listener.
                * The cleanup function is called when the component is destroyed.
                */
                return () => {
                    /*
                    * Tick returns a Promise that resolves once any pending state changes
                    * have been applied to the DOM. This ensures that any reactive updates
                    * triggered by localStorage changes are fully processed by Svelte
                    * before proceeding with other logic.
                    */
                    tick().then(() => {
                        this.#listeners -= 1;
                        if (this.#listeners === 0) {
                            window.removeEventListener('storage', this.#handler);
                        }
                    });
                };
            });
        }

        // Returns the root object, wrapped in a proxy (if it's an object)
        return proxy(root);
    }

    set current(value) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.#key, JSON.stringify(value));
        }

        this.#version += 1;
    }
}