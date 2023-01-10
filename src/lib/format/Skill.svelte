<script lang="ts">
    import Ability from "$lib/format/Ability.svelte";
    import Piece from "$lib/format/Piece.svelte";
    import PieceCount from "$lib/format/PieceCount.svelte";
    import Attribute from "$types/attribute.js";
    import Language from "$types/language.js";
    import type {SvelteComponentTyped} from "svelte";

    export let lang: Language = Language.ENG;
    export let skill: string | null;
    export let parseAsHelpText: boolean = false;

    interface TextNode {
        text: string;
        element?: string;
        pre?: string;
        post?: string;
        class?: string;
    }

    interface ComponentNode {
        components: {
            component: new (...args: any) => SvelteComponentTyped<any>;
            props: { [key: any]: any };
        }[];
        element?: string;
        class?: string;
    }

    type RenderNode = TextNode | ComponentNode;

    function isTextNode(node: RenderNode): node is TextNode {
        return node.hasOwnProperty("text");
    }

    let renderNodes: RenderNode[];
    $: renderNodes = makeNodes(skill);

    function makeNodes(skill: string | null) {
        if (skill === null) return [{text: "—"}];
        const renderNodes: (TextNode | ComponentNode)[] = [{text: skill}];

        if (lang === Language.ENG) {
            if (!parseAsHelpText && skill.charAt(0) === "[") {
                // Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
                //apply(renderNodes, /^\[([^\[\]]*?)]\/?/, trigger);
                //apply(renderNodes, /"[^"]*?"/, highlightRed);
                //apply(renderNodes, /♪Live Points \+[^♪]*?♪/, highlightRed);
                //apply(renderNodes, /♪Live Points -[^♪]*?♪/, highlightBlue);
                //apply(renderNodes, /♪Live Points -[^♪]*?♪/, highlightBlue);
            }
            apply(renderNodes, /⟪([^⟪⟫]*?)⟫/, bold.bind(this, "⟪", "⟫"));
            apply(renderNodes, /\+(\[(?:ALL|SMILE|PURE|COOL)])+/, bold.bind(this, "+", ""));
            //apply(renderNodes, /\[Idolized \(Piece Bonus\)]/, idolized);
            apply(renderNodes, /\[(\d)(\d)(\d)]/, attrRequirement);
            apply(renderNodes, /\[RUSH\/LIVE]/, abilityBoth);
            apply(renderNodes, /\[(RUSH|LIVE)]/, abilityOne);
            //apply(renderNodes, /\[([^\[\]]*?)]\/?/, trigger);
            apply(renderNodes, /(?:\[(?:ALL|SMILE|PURE|COOL)])+/, pieces.bind(this, "]["));
            //apply(renderNodes, /(1|2|3|one|two|three|has|each|more|no|with|without) (Stars?)/, cost);
        }

        return renderNodes;
    }

    function apply(renderNodes: RenderNode[], regex: RegExp, replaceFunc: (match: RegExpExecArray) => RenderNode[]) {
        let i = 0;
        while (i < renderNodes.length) {
            if (!isTextNode(renderNodes[i])) {
                i++;
                continue;
            }

            const node = <TextNode>renderNodes[i];
            const match = regex.exec(node.text);
            if (!match) {
                i++;
                continue;
            }
            console.log(regex, node.text, match);

            renderNodes.splice(i, 1,
                {text: node.text.substring(0, match.index)},
                ...replaceFunc(match),
                {text: node.text.substring(match.index + match[0].length)}
            );
            i += 2;
            console.log(renderNodes);
        }
    }

    function bold(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
        return [
            {text: match[1], element: "b", pre, post, class: "whitespace-nowrap"}
        ]
    }

    function attrRequirement(match: RegExpExecArray): RenderNode[] {
        return [{
            components: [
                {
                    component: PieceCount, props: {
                        pieces: {
                            piecesSmile: parseInt(match[1]),
                            piecesPure: parseInt(match[2]),
                            piecesCool: parseInt(match[3])
                        },
                        showZero: true,
                        reducedGap: true
                    }
                }
            ]
        }];
    }

    function abilityBoth(match: RegExpExecArray): RenderNode[] {
        return [{
            components: [
                {component: Ability, props: {rush: true, live: true}}
            ]
        }];
    }

    function abilityOne(match: RegExpExecArray): RenderNode[] {
        const rush = match[1] === "RUSH";
        return [{
            components: [
                {component: Ability, props: {rush, live: !rush}}
            ]
        }];
    }

    function pieces(splitter: string, match: RegExpExecArray): RenderNode[] {
        const pieces = match[0].substring(1, match[0].length - 1).split(splitter);
        return [{
            components: pieces.map(p => {
                const attr = Attribute.get(p);
                return {component: Piece, props: {attr}};
            }),
            element: "span",
            class: "whitespace-nowrap"
        }];
    }
</script>

{#each renderNodes as node}
    {#if isTextNode(node)}
        {#if node.hasOwnProperty("element")}
            <svelte:element this={node.element} class={node.class}>{node.pre}{node.text}{node.post}</svelte:element>
        {:else}
            {node.text}
        {/if}
    {:else}
        {#if node.hasOwnProperty("element")}
            <svelte:element this={node.element} class={node.class}>
                {#each node.components as c}<svelte:component this={c.component} {lang} {...c.props}/>{/each}
            </svelte:element>
        {:else}
            {#each node.components as c}<svelte:component this={c.component} {lang} {...c.props}/>{/each}
        {/if}
    {/if}
{/each}

<style lang="postcss">

</style>