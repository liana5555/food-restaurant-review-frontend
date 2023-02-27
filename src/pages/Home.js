import React from "react"

import food1 from "../random-food-img-1.jpg"
import food2 from "../random-food-img-2.jpg"
import food3 from "../random-food-img-3.jpg"
import food4 from "../random-food-img-4.jpg"
import { Link } from "react-router-dom";





export default function Home () {
//This is only for designing it will be fetched later
    const dummy_data = [
    {
        id: 1,
        title: "Reprehenderit esse occaecat incididunt enim proident.",
        desc: "Do ullamco deserunt ut velit adipisicing aliqua non reprehenderit enim commodo non. Pariatur dolore dolor minim eiusmod ipsum laborum dolore. Lorem deserunt proident duis aute et nulla proident ullamco sunt laborum in consectetur quis eiusmod. Cillum adipisicing velit amet ullamco et duis culpa ex aute consectetur qui. Ut est do culpa enim ex id ut do velit magna. Adipisicing in do duis consectetur. Quis Lorem proident nisi quis do adipisicing officia deserunt irure dolor excepteur.",
        img: food1,
        rating: 5

    },
    {
        id: 2,
        title: "Reprehenderit esse occaecat incididunt enim proident.",
        desc: "Do ullamco deserunt ut velit adipisicing aliqua non reprehenderit enim commodo non. Pariatur dolore dolor minim eiusmod ipsum laborum dolore. Lorem deserunt proident duis aute et nulla proident ullamco sunt laborum in consectetur quis eiusmod. Cillum adipisicing velit amet ullamco et duis culpa ex aute consectetur qui. Ut est do culpa enim ex id ut do velit magna. Adipisicing in do duis consectetur. Quis Lorem proident nisi quis do adipisicing officia deserunt irure dolor excepteur.",
        img: food2,
        rating: 3
    },
    {
        id: 4,
        title: "Reprehenderit esse occaecat incididunt enim proident.",
        desc: "Do ullamco deserunt ut velit adipisicing aliqua non reprehenderit enim commodo non. Pariatur dolore dolor minim eiusmod ipsum laborum dolore. Lorem deserunt proident duis aute et nulla proident ullamco sunt laborum in consectetur quis eiusmod. Cillum adipisicing velit amet ullamco et duis culpa ex aute consectetur qui. Ut est do culpa enim ex id ut do velit magna. Adipisicing in do duis consectetur. Quis Lorem proident nisi quis do adipisicing officia deserunt irure dolor excepteur.",
        img: food3,
        rating: 8

    },
    {
    id: 1,
        title: "Reprehenderit esse occaecat incididunt enim proident.",
        desc: "Do ullamco deserunt ut velit adipisicing aliqua non reprehenderit enim commodo non. Pariatur dolore dolor minim eiusmod ipsum laborum dolore. Lorem deserunt proident duis aute et nulla proident ullamco sunt laborum in consectetur quis eiusmod. Cillum adipisicing velit amet ullamco et duis culpa ex aute consectetur qui. Ut est do culpa enim ex id ut do velit magna. Adipisicing in do duis consectetur. Quis Lorem proident nisi quis do adipisicing officia deserunt irure dolor excepteur.",
        img: food4,
        rating: 9

    }
    ]

    
    const posts = dummy_data.map((post) => {
        return (
        <div className="post-container" key={post.id}>
            
            <div className="post-content">
                <Link className="link-on-home" to={`/posts/${post.id}`}>
                <h2 className="post-title">{post.title}</h2>
                </Link>
                <p className="post-desc">{post.desc}</p>
                <button className="read-more">Read More</button>
            </div>
            <div className="post-image">
                <img alt={post.title + "image"} src={post.img} />
            </div>
           
            
        </div>)
    })


    return (
       <main className="home posts-container">
            {posts}
       </main>
    )


}