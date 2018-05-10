class SalesController < ApplicationController
    def index
        if params[:view] == "all"
            histogramData = ActiveRecord::Base.connection.execute(
                <<-SQL
                    SELECT SUM(count)
                    FROM saleRecords
                    WHERE extract("month", date) = ?
                    GROUP BY date
                    ORDER BY date;
                SQL
                ,[params[:month]]
            )
        elsif params[:view] == "title"
            histogramData = ActiveRecord::Base.connection.execute(
                <<-SQL
                    SELECT count
                    FROM saleRecords
                    WHERE extract("month", date) = ? AND title = ?
                    ORDER BY date;
                SQL
                ,[params[:month], params[:title]]
            )
        else
            render json: {general: "view not specified"}, status: 422
        end
    end
end