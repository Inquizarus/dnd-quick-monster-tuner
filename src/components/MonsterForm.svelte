<script>
    import { createEventDispatcher } from "svelte";
    import { CR_SCALE } from "../data/cr-scale";
    import StatInput from "./StatInput.svelte";
    import { attributes } from "../data/attributes";
    import { evaluateFormula } from "../data/baselines";

    export let monster = {
        name: "",
        cr: 1,
        hp: 0,
        ac: 0,
        pb: 0,
        dpr: 0,
        noa: 0,
        dpa: 0,
    };

    export let baseline;

    export function diffClass(current, expected) {
        if (current === expected) return "";
        return "bg-yellow-100";
    }

    export function diffTextColor(current, expected) {
        if (current > expected) return "text-green-600";
        if (current < expected) return "text-red-600";
        return "text-black";
    }

    export function diffTooltip(current, expected, unit = "") {
        const diff = current - expected;
        if (diff === 0) return "";
        const sign = diff > 0 ? "+" : "";
        return `${sign}${diff}${unit} från baseline`;
    }

    const dispatch = createEventDispatcher();

    const emitChange = () => {
        dispatch("change", { monster });
    };

    let expected;

    $: {
        const CR = monster.cr;

        const hp = Math.round(evaluateFormula(baseline.hpFormula, { CR }));
        const ac = Math.round(evaluateFormula(baseline.acFormula, { CR }));
        const pb = Math.round(evaluateFormula(baseline.pbFormula, { CR }));
        const dpr = Math.round(evaluateFormula(baseline.dprFormula, { CR }));

        const noa = Math.max(
            1,
            Math.round(evaluateFormula(baseline.noaFormula, { CR, dpr })),
        );
        const dpa = Math.round(
            evaluateFormula(baseline.dpaFormula, { CR, dpr, noa }),
        );

        expected = { hp, ac, pb, dpr, noa, dpa };
    }

    $: if (monster.dpr && monster.noa && monster.noa !== 0) {
        monster = {
            ...monster,
            dpa: Math.round(monster.dpr / monster.noa),
        };
    }
</script>

<div class="mb-4">
    <label class="block font-semibold"
        >Name:
        <input
            type="text"
            bind:value={monster.name}
            on:input={emitChange}
            class="bg-nord-6 text-nord-0 dark:bg-nord-1 dark:text-nord-4 border border-nord-3 dark:border-nord-2 rounded px-2 py-1 w-full"
        /></label
    >
</div>
<div class="grid grid-cols-7 gap-2 mb-4 text-center">
    <div class="text-center text-sm">
        <label class="block text-xs font-semibold mb-1 uppercase">CR</label>
            <select
                bind:value={monster.cr}
                on:change={emitChange}
                class="bg-nord-6 text-nord-0 dark:bg-nord-1 dark:text-nord-4 border border-nord-3 dark:border-nord-2 rounded px-2 py-1 w-full text-center text-sm"
            >
                {#each CR_SCALE as cr}
                    <option value={cr.value}>{cr.label}</option>
                {/each}
            </select>
        
    </div>
    {#each attributes as attr}
        <StatInput
            label={attr.abbreviation}
            value={attr.getValue(monster)}
            description={attr.description}
            expected={expected[attr.abbreviation]}
            readonly={attr.abbreviation === "dpa"}
            on:change={(e) => {
                monster = attr.setValue(monster, e.detail);
                emitChange();
            }}
        />
    {/each}
</div>
