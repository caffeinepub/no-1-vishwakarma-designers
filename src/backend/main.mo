import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";

import AccessControl "authorization/access-control";

// Add migration with-clause

actor {
  type OrderStatus = {
    #pending;
    #inProgress;
    #completed;
  };

  type OrderCategory = {
    #livingRoom;
    #bedroom;
    #kitchen;
    #bathroom;
    #office;
    #modularWork;
    #modularWardrobe;
    #lighting;
    #flooring;
    #electricalWork;
    #civilWork;
    #falseCeiling;
    #wallDesign;
    #painting;
  };

  type Order = {
    id : Nat;
    timestamp : Time.Time;
    name : Text;
    phone : Text;
    email : Text;
    address : Text;
    category : OrderCategory;
    budget : Text;
    notes : Text;
    status : OrderStatus;
    owner : Principal;
  };

  type Feedback = {
    id : Nat;
    timestamp : Time.Time;
    name : Text;
    rating : Nat;
    comment : Text;
    approved : Bool;
  };

  module OrderModule {
    public func compare(order1 : Order, order2 : Order) : Order.Order {
      Nat.compare(order1.id, order2.id);
    };
  };

  public type UserProfile = {
    name : Text;
    phone : Text;
    email : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let orders = Map.empty<Nat, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let feedbacks = Map.empty<Nat, Feedback>();
  var nextOrderId = 0;
  var nextFeedbackId = 0;

  // Check if any admin has been assigned yet
  public query func hasAnyAdmin() : async Bool {
    accessControlState.adminAssigned;
  };

  // Allow first logged-in user to claim admin if none exists
  public shared ({ caller }) func claimAdmin() : async Bool {
    if (caller.isAnonymous()) {
      return false;
    };
    if (accessControlState.adminAssigned) {
      return false;
    };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    true;
  };

  // Reset admin assignment so owner can reclaim access
  public shared ({ caller }) func resetAdmin() : async Bool {
    if (caller.isAnonymous()) {
      return false;
    };
    for (principal in accessControlState.userRoles.keys().toArray().vals()) {
      accessControlState.userRoles.remove(principal);
    };
    accessControlState.adminAssigned := false;
    true;
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Feedback Management
  public shared ({ caller }) func submitFeedback(name : Text, rating : Nat, comment : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit feedback");
    };
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let feedbackId = nextFeedbackId;
    let feedback : Feedback = {
      id = feedbackId;
      timestamp = Time.now();
      name = name;
      rating = rating;
      comment = comment;
      approved = true;
    };
    feedbacks.add(feedbackId, feedback);
    nextFeedbackId += 1;
    feedbackId;
  };

  public query func getApprovedFeedbacks() : async [Feedback] {
    feedbacks.values().toArray().filter(func(f) { f.approved }).sort(func(a, b) { Nat.compare(b.id, a.id) });
  };

  public query ({ caller }) func getAllFeedbacks() : async [Feedback] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can view all feedbacks");
    };
    feedbacks.values().toArray().sort(func(a, b) { Nat.compare(b.id, a.id) });
  };

  // Order Management
  public shared ({ caller }) func submitOrder(
    name : Text,
    phone : Text,
    email : Text,
    address : Text,
    category : OrderCategory,
    budget : Text,
    notes : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit orders");
    };

    let orderId = nextOrderId;
    let order : Order = {
      id = orderId;
      timestamp = Time.now();
      name = name;
      phone = phone;
      email = email;
      address = address;
      category = category;
      budget = budget;
      notes = notes;
      status = #pending;
      owner = caller;
    };
    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async ?Order {
    switch (orders.get(orderId)) {
      case (null) { null };
      case (?order) {
        if (order.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        ?order;
      };
    };
  };

  public query ({ caller }) func getOrdersByCategory(category : OrderCategory) : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can view orders by category");
    };
    orders.values().toArray().filter(func(order) { order.category == category }).sort();
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their orders");
    };
    orders.values().toArray().filter(func(order) { order.owner == caller }).sort();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can update orders");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = {
          order with
          status;
        };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  public shared ({ caller }) func deleteOrder(orderId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can delete orders");
    };
    let exists = orders.get(orderId) != null;
    orders.remove(orderId);
    exists;
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can view all orders");
    };
    orders.values().toArray().sort();
  };
};
