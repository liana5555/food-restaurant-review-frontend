

const date = "2023-08-20T12:00:00.000Z"

export default function dateSimplify (date) {

   if (date===undefined) return date

    let re_date2 = date.split(".")[0].replaceAll("-", ".").replace("T", " ")



    return re_date2
}

console.log(dateSimplify(date))