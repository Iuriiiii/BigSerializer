import { serializeValue } from "../mod.ts";

const OBJECT_TO_SERIALIZE = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                h: {
                                    i: {
                                        j: {
                                            k: {
                                                l: {
                                                    m: {
                                                        n: {
                                                            o: {
                                                                p: {
                                                                    q: {
                                                                        r: {
                                                                            s: {
                                                                                t: 1,
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit vel tortor id mollis. Maecenas maximus ac arcu non fermentum. Pellentesque consectetur tincidunt dui, nec laoreet ligula egestas eu. Donec sagittis, diam quis tincidunt interdum, neque tortor varius sapien, eu rutrum nulla est a lacus. Duis luctus consequat lobortis. Nam sit amet ex in lectus laoreet pharetra et eget enim. Morbi vel ultricies lacus, at blandit diam. In hac habitasse platea dictumst. Aenean pretium, ipsum sed pharetra facilisis, nibh magna egestas nunc, eu suscipit arcu massa eget dolor. Vivamus finibus semper maximus.",
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
};

Deno.bench("serialize object", () => {
    serializeValue(OBJECT_TO_SERIALIZE);
});

Deno.bench("serialize to json", () => {
    JSON.stringify(OBJECT_TO_SERIALIZE);
});
