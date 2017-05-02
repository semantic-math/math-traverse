/**
 * traverse - walk all of the nodes in a tree.
 */

function traverse(node, {enter = () => {}, leave = () => {}}) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            enter(node)
            node.args.forEach((arg) => traverse(arg, {enter, leave}))
            leave(node)
            break

        // leaf nodes
        case 'Identifier':
        case 'Number':
            enter(node)
            leave(node)
            break

        // irregular non-leaf nodes
        case 'Parentheses':
            enter(node)
            traverse(node.body, {enter, leave})
            leave(node)
            break

        case 'List':
        case 'Sequence':
            enter(node)
            node.items.forEach((item) => traverse(item, {enter, leave}))
            leave(node)
            break

        case 'System':
            enter(node)
            node.relations.forEach((rel) => traverse(rel, { enter, leave }))
            leave(node)
            break

        case 'Placeholder':
            // TODO(kevinb) handle children of the placeholder
            // e.g. we there might #a_0 could match x_0, y_0, z_0, etc.
            enter(node)
            leave(node)
            break

        default:
            throw new Error(`unrecognized node: ${node.type}`)
    }
}

module.exports = traverse
