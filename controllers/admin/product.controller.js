const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const filterStatus = [{
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    if (req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        filterStatus[index].class = "active"
    } 
    else {
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
    }

    if (req.query.status)
        find.status = req.query.status

    const keyword = ""

    const products = await Product.find(find)

    res.render("admin/page/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    })
}