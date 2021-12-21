import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';

export default function TitlebarBelowImageList({ tab }) {
    console.log(`tab: ${tab}`);
    return (
        itemData[tab].length === 0 ? 
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
            아직 게시물이 없어요 :(
        </Typography> :
        <ImageList sx={{ width: 500, height: 450 }}>
            
            {itemData[tab].map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={<span>by: {item.author}</span>}
                        position="below"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
const itemData = new Array(4);
itemData[0] = [
    {
        img: 'https://images.velog.io/images/mjlee0326/post/1183bd08-eca5-4307-b11b-d00a5360a095/78076322-3B81-43FC-B7A4-2730F36BA0E1_1_201_a.jpeg',
        title: '화장품1',
        author: '에뛰드하우스',
    },
    {
        img: 'https://images.velog.io/images/mjlee0326/post/f4fe0691-2a08-4130-9239-67bf0e2cadb6/96F4AB41-C8A1-4B38-B7C9-068CC62FD9D7_1_201_a.jpeg',
        title: '화장품2',
        author: '이니스프리',
    },
    {
        img: 'https://images.velog.io/images/mjlee0326/post/fb084d55-5ee6-461d-ab5a-4846a2ea7a44/00702188-DA12-47D1-874E-54FCC95E9C22_1_201_a.jpeg',
        title: '화장품3',
        author: '이니스프리',
    },
    {
        img: 'https://images.velog.io/images/mjlee0326/post/dcaf46b8-64e6-4471-86a4-b2fc1c40f645/C12FFC15-2F37-46F0-A657-A7333A22C72E_1_201_a.jpeg',
        title: '화장품4',
        author: '구찌',
    },
    {
        img: 'https://images.velog.io/images/mjlee0326/post/da773b36-714c-40b6-a108-3d25b92da892/13187BDF-A6A6-492B-BC03-9F174D9FC184_1_201_a.jpeg',
        title: '화장품5',
        author: '설화수',
    },
    {
        img: 'https://images.velog.io/images/mjlee0326/post/0520de05-fd4b-4f2c-bf21-ccf08f812064/5DEB3FD5-8002-4056-9541-C7EA98FBA11B_1_201_a.jpeg',
        title: '화장품6',
        author: '맥',
    },
];

itemData[1] = [];
itemData[2] = [];
itemData[3] = [];