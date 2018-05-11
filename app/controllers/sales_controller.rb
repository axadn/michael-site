class SalesController < ApplicationController
    def index
        if params[:title] && params[:month]
            render json: SaleRecord.where("EXTRACT('month' FROM sale_records.date) = ? AND title = ?",
                params[:month], params[:title])
            .order("EXTRACT('day' FROM date)")
            .pluck("DISTINCT EXTRACT('day' FROM date), count")
        elsif params[:month]
            records = SaleRecord.where("EXTRACT('month' FROM date) = ?", 
                params[:month])


            histogram = records
            .order(:date)
            .group("sale_records.date")
            .pluck("EXTRACT('day' FROM date), SUM(count)")
            

            titles = records
            .order("SUM(count) DESC")
            .group(:title)
            .pluck("title, SUM(count)")

            render json: {
                titles: titles,
                histogram: histogram
            }
        else
            render json: {general: "missing params"}, status: 422
        end
    end
end