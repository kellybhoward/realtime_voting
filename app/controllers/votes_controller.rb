class VotesController < ApplicationController
    def index
    end
    def all
        @votes = Vote.all
        render json: @votes
    end
    def create
        @vote = Vote.first
        if params[:id] == 'php'
            @vote.increment!("php", by = 1)
        elsif params[:id] == 'ruby'
            @vote.increment!("ruby", by = 1)
        elsif params[:id] == 'js'
            @vote.increment!("javascript", by = 1)
        end
        render json: @vote
    end
end
