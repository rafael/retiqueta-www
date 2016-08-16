module Admin
  class BankAccountsController < Admin::ApplicationController
    # To customize the behavior of this controller,
    # simply overwrite any of the RESTful actions. For example:
    #
     def index
       search_term = params[:search].to_s.strip
       resources = nil
       if search_term && user = User.find_by_username(search_term)
         resources = BankAccount.where(profile_id: user.profile.id).page(params[:page]).per(20)
       elsif search_term != ""
         resources = BankAccount.where(id: nil).page(0).per(0)
       else
         resources = BankAccount.all.page(params[:page]).per(20)
       end
       resources = order.apply(resources)
       page = Administrate::Page::Collection.new(dashboard, order: order)
       render locals: {
                resources: resources,
                search_term: search_term,
                page: page,
              }
     end

    # Define a custom finder by overriding the `find_resource` method:
    # def find_resource(param)
    #   BankAccount.find_by!(slug: param)
    # end

    # See https://administrate-docs.herokuapp.com/customizing_controller_actions
    # for more information
  end
end
