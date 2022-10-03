class APIFeatures {
    constructor(query, queryStr){
      this.query = query;
      this.queryStr = queryStr;
    }

    filter(){
     // 1) FILTERING
     const queryObj = {...this.queryStr}
     const excludedFields = ['page', 'sort', 'limit', 'fields']
     excludedFields.forEach(el => delete queryObj[el])

     let queryStr = JSON.stringify(queryObj)

     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

     this.query = this.query.find(JSON.parse(queryStr))
     // let query = Tour.find(JSON.parse(queryStr))
     return this;
    }
    sort(){
       // 2) SORTING
         if(this.queryStr.sort){
             const sortBy = this.queryStr.sort.split(',').join(' ')
             console.log(sortBy)
             this.query = this.query.sort(sortBy)
         }else{
             this.query = this.query.sort('-_id')
         }
         return this;
    }
    limitFields(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select('-__v')
        }
        return this;
    }
    paginate(){
        // 3) PAGINATION
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 100;
        const skip = (page - 1) * limit;

        // page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}
module.exports = APIFeatures
