import assert from 'assert'

import traverse from '../traverse'

describe('traverse', () => {
    it('should pass the current path to enter and leave', () => {
        const ast = {
            type: 'Apply',
            op: 'add',
            args: [{
                type: 'Number',
                value: '5',
            }, {
                type: 'Identifier',
                name: 'a',
            }]
        }

        let enterPath = []
        let leavePath = []

        traverse(ast, {
            enter(node, path) {
                if (node.value === '5') {
                    enterPath = path
                }
            },
            leave(node, path) {
                if (node.name === 'a') {
                    leavePath = path
                }
            }
        })

        assert.deepEqual(enterPath, ['args', 0])
        assert.deepEqual(leavePath, ['args', 1])
    })

    it('should pass the current path to enter and leave', () => {
        const ast = {
            type: 'Apply',
            op: 'add',
            args: [{
                type: 'Apply',
                op: 'add',
                args: [
                    {
                        type: 'Number',
                        value: '5',
                    },
                    {
                        type: 'Number',
                        value: '10',
                    },
                ],
            }, {
                type: 'Identifier',
                name: 'a',
            }]
        }

        let enterPath = []
        let leavePath = []

        traverse(ast, {
            enter(node, path) {
                if (node.value === '5') {
                    enterPath = path
                }
            },
            leave(node, path) {
                if (node.value === '10') {
                    leavePath = path
                }
            }
        })

        assert.deepEqual(enterPath, ['args', 0, 'args', 0])
        assert.deepEqual(leavePath, ['args', 0, 'args', 1])
    })
})