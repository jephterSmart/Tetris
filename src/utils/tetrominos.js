export const TETROMINOS = {
    0: {
        shape: [[0]],
        color: '20,20,20'
    },
    T: {
        shape:[
            [0,0,0],
            ['T',"T",'T'],
            [0,"T",0],
        ],
        color:'255,255,0'
    },
    O:{
        shape:[
            ['O','O'],
            ['O','O']
        ],
        color:'255,165,0',
    },
    L:{
        shape:[
            [0,'L',0],
            [0,'L',0],
            [0,'L','L'],
        ],
        color:'0,0,255'
    },
    J: {
        shape:[
            [0, 'J',0],
            [0, 'J',0],
            ['J', 'J',0],
        ],
        color: '0,255,0'
    },
    S:{
        shape:[
            [0,0,0],
            [0,'S','S'],
            ['S','S',0]
        ],
        color:'128,0,128',
    },
    Z: {
        shape:[
            [0,0,0],
            ['Z','Z',0],
            [0,'Z','Z']
        ],
        color: '255,0,0'
    },
    I:{
        shape:[
            [0,'I',0,0],
            [0,'I',0,0],
            [0,'I',0,0],
            [0,'I',0,0]
        ],
        color: '138,43,226',
    }
}

export const tetrominoGenerator = () => {
    const tetroStr = 'LJSZOTI';
    return TETROMINOS[tetroStr[Math.floor(Math.random() * tetroStr.length)]]
}