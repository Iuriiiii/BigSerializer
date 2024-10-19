const _ = undefined;

Deno.bench("check undefined with typeof", () => {
    typeof _ === "undefined";
});

Deno.bench("check undefined with strict comparison", () => {
    // @ts-ignore: Check number
    _ === undefined;
});
