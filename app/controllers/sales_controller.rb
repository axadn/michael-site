class SalesController < ApplicationController
    def index
        if params[:view] == "all"
            render json: SaleRecord.where("EXTRACT('month' FROM date) = ?", 
                params[:month])
            .group("sale_records.date")
            .order(:date)
            .pluck("EXTRACT('day' FROM date), SUM(count)")
        elsif params[:view] == "title"
            render json: SaleRecord.where("EXTRACT('month' FROM date) = ? AND title = ?",
                params[:month], params[:title])
            .order(:date)
            .pluck("UNIQUE EXTRACT('day' FROM date), count")
        else
            render json: {general: "view not specified"}, status: 422
        end
    end
end