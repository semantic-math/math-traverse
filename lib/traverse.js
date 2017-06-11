/**
 * traverse - walk all of the nodes in a tree.
 */

function traverse(node, {enter = () => {}, leave = () => {}}, path = []) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            enter(node, path)
            node.args.forEach((arg, index) =>
                traverse(arg, {enter, leave}, [...path, 'args', index]))
            leave(node, path)
            break

        // leaf nodes
        case 'Identifier':
        case 'Number':
        case 'Ellipsis':
            enter(node, path)
            leave(node, path)
            break

        // irregular non-leaf nodes
        case 'Parentheses':
            enter(node, path)
            traverse(node.body, {enter, leave}, [...path, 'body'])
            leave(node, path)
            break

        case 'List':
        case 'Sequence':
            enter(node, path)
            node.items.forEach((item, index) =>
                traverse(item, {enter, leave}, [...path, 'items', index]))
            leave(node, path)
            break

        case 'System':
            enter(node, path)
            node.relations.forEach((rel, index) =>
                traverse(rel, {enter, leave}, [...path, 'relations', index]))
            leave(node, path)
            break

        case 'Placeholder':
            // TODO(kevinb) handle children of the placeholder
            // e.g. we there might #a_0 could match x_0, y_0, z_0, etc.
            enter(node, path)
            leave(node, path)
            break

        default:
            throw new Error(`unrecognized node: ${node.type}`)
    }
}

module.exports = traverse
