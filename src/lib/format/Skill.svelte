<script lang="ts">
    import Ability from "$lib/format/Ability.svelte";
    import Idolized from "$lib/format/Idolized.svelte";
    import Piece from "$lib/format/Piece.svelte";
    import PieceCount from "$lib/format/PieceCount.svelte";
    import TriggerComponent from "$lib/format/Trigger.svelte";
    import Trigger from "$translation/trigger.js";
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
                apply(renderNodes, /^\[([^\]]*?)]\/?([^(]*?)(?= \(|$)/, triggerWithClose);
                apply(renderNodes, /"([^"]*?)"/, highlightRed.bind(this, "\"", "\""));
                apply(renderNodes, /♪(Live Points \+[^♪]*?)♪/, highlightRedNoWrap.bind(this, "♪", "♪"));
                apply(renderNodes, /♪(Live Points -[^♪]*?)♪/, highlightBlueNoWrap.bind(this, "♪", "♪"));
            }
            apply(renderNodes, /⟪([^⟪⟫]*?)⟫/, bold.bind(this, "⟪", "⟫"));
            apply(renderNodes, new RegExp("\\+(\\[(?:" + Attribute.all
                .filter(t => t.pieceAttributeNameEng !== undefined)
                .map(t => t.pieceAttributeNameEng).join("|") + ")])+"), pieces.bind(this, "][", true));
            apply(renderNodes, /\[Idolized \(Piece Bonus\)]/, idolized);
            apply(renderNodes, /\[(\d)(\d)(\d)]/, attrRequirement);
            apply(renderNodes, /\[RUSH\/LIVE]/, abilityBoth);
            apply(renderNodes, /\[(RUSH|LIVE)]/, abilityOne);
            apply(renderNodes, new RegExp("\\[(" + Trigger.all.map(t => t.nameEng).join("|") + ")]/?"), trigger);
            apply(renderNodes, new RegExp("(?:\\[(?:" + Attribute.all
                .filter(t => t.pieceAttributeNameEng !== undefined)
                .map(t => t.pieceAttributeNameEng).join("|") + ")])+"), pieces.bind(this, "][", false));
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
            if (node.text === "") {
                renderNodes.splice(i, 1);
                continue;
            }

            const match = regex.exec(node.text);
            if (!match) {
                i++;
                continue;
            }

            renderNodes.splice(i, 1,
                {...node, text: node.text.substring(0, match.index) },
                ...replaceFunc(match),
                {...node, text: node.text.substring(match.index + match[0].length)}
            );
            console.log(regex, match, renderNodes);
            i += 2;
        }
    }

    function triggerWithClose(match: RegExpExecArray): RenderNode[] {
        const trigger = Trigger.get(match[1]);
        if (trigger.id === Trigger.ID_SP) {
            return [
                {
                    components: [
                        {component: TriggerComponent, props: {trigger}}
                    ]
                },
                {text: match[2]},
                {
                    components: [
                        {component: TriggerComponent, props: {trigger, closing: true}}
                    ]
                }
            ];
        } else {
            return [
                {
                    components: [
                        {component: TriggerComponent, props: {trigger}}
                    ]
                },
                {text: match[2]}
            ];
        }
    }

    function trigger(match: RegExpExecArray): RenderNode[] {
        const trigger = Trigger.get(match[1]);
        return [
            {
                components: [
                    {component: TriggerComponent, props: {trigger}}
                ]
            }
        ];
    }

    function bold(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
        return [
            {text: match[1], element: "b", pre, post, class: "inline-block"}
        ]
    }

    function highlightRed(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
        return [
            {text: match[1], element: "span", pre, post, class: "text-highlight-red"}
        ]
    }

    function highlightRedNoWrap(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
        return [
            {text: match[1], element: "span", pre, post, class: "text-highlight-red inline-block"}
        ]
    }

    function highlightBlueNoWrap(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
        return [
            {text: match[1], element: "span", pre, post, class: "text-highlight-blue inline-block"}
        ]
    }

    function idolized(match: RegExpExecArray): RenderNode[] {
        return [{
            components: [
                {component: Idolized, props: {repl: match[0]}}
            ]
        }];
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

    function pieces(splitter: string, isGain: boolean, match: RegExpExecArray): RenderNode[] {
        const pieces = match[0].substring(isGain ? 2 : 1, match[0].length - 1).split(splitter);
        return [
            ...(isGain ? [{text: "+", element: "b"}] : []),
            {
                components: pieces.map(p => {
                    const attr = Attribute.get(p);
                    return {component: Piece, props: {attr}};
                }),
                element: "span",
                class: isGain ? "inline-block font-bold" : "inline-block"
            }
        ];
    }
</script>

{#each renderNodes as node}
    {#if isTextNode(node)}
        {#if node.hasOwnProperty("element")}
            <svelte:element this={node.element} class={node.class}>{node.pre ?? ""}{node.text}{node.post ?? ""}</svelte:element>
        {:else}
            {node.text}
        {/if}
    {:else}
        {#if node.hasOwnProperty("element")}
            <svelte:element this={node.element} class={node.class}>
                {#each node.components as c}
                    <svelte:component this={c.component} {lang} {...c.props}/>
                {/each}
            </svelte:element>
        {:else}
            {#each node.components as c}
                <svelte:component this={c.component} {lang} {...c.props}/>
            {/each}
        {/if}
    {/if}
{/each}

<style lang="postcss">

</style>